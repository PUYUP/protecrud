import { Component, HostListener, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AssetEditorComponent } from '../asset-editor/asset-editor.component';
import { Subject, takeUntil } from 'rxjs';
import { ActionsSubject, Store } from '@ngrx/store';
import { AppState } from 'src/app/state/state';
import { DeleteAsset, RetrieveCompany } from '../../state';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/features/user/services';

@Component({
  selector: 'tracker-asset-list',
  templateUrl: './asset-list.component.html',
  styleUrls: ['./asset-list.component.scss']
})
export class AssetListComponent {

  @Input('props') props: any;

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;
  }

  public getScreenWidth: any;
  public getScreenHeight: any;
  public displayedColumns: string[] = ['name', 'quantity', 'condition', 'description', 'action'];
  public roles: string[] = [];

  private onDestroy$: Subject<boolean> | any = new Subject<boolean>;

  constructor(
    private matDialog: MatDialog,
    private store: Store<AppState>,
    private actionsSubject$: ActionsSubject,
    private authService: AuthService,
  ) {
    this.roles = this.authService.Roles;
    
    // listen state changed
    this.actionsSubject$.pipe(takeUntil(this.onDestroy$)).subscribe((state: any) => {
      switch (state.type) {
        case '[Tracker] Submit Asset Success':
        case '[Tracker] Update Asset Success':
          this.matDialog.closeAll();
          this.store.dispatch(RetrieveCompany({ pid: state.data.company }));
          break;
      }
    });
  }

  addAssetHandler(data: any = {}): void {
    const dialogRef = this.matDialog.open(AssetEditorComponent, {
      data: {
        ...data,
        company: this.props.pid,
      },
      autoFocus: false,
      width: '450px',
      maxWidth: '450px',
    });
  }

  editHandler(data: any): void {
    this.addAssetHandler(data);
  }

  deleteHandler(pid: string | number): void {
    Swal.fire({
      icon: 'warning',
      title: 'Do you want to delete this record?',
      showCancelButton: true,
      confirmButtonText: 'Sure, delete',
    }).then((result) => {
      if (result.isConfirmed) {
        this.store.dispatch(DeleteAsset({ pid: pid }));
      }
    });
  }
  
  ngOnDestroy(): void {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }

}
