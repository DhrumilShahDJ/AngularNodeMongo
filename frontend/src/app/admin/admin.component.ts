import {
  AfterViewInit,
  Component,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CommonService } from '../common/common.service';
import { RoleRequest } from '../interfaces/role.interface';
import {
  SendUpdatedUser,
  UpdateUser,
  User,
} from '../interfaces/user.interface';
import { RoleService } from '../role/role.service';
import { AdminService } from './admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['name', 'email', 'role', 'action'];
  responseData: Array<User> = [];
  length: number;
  pageSize: number;
  pageSizeOptions: Array<number>;
  dataSource = new MatTableDataSource<User>(this.responseData);
  userRoles: Array<RoleRequest> = [];
  showConfirmDelete: boolean = false;
  deletedUser: SendUpdatedUser;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(
    private adminService: AdminService,
    private commonService: CommonService,
    public dialog: MatDialog,
    private roleService: RoleService
  ) {}

  ngOnInit(): void {
    this.pageSizeOptions = this.commonService.pageSizeOptions;
    this.pageSize = this.commonService.pageSize;
    this.getAllRoles();
    this.getUser();
  }

  getUser(): void {
    this.adminService.getAllUsers([]).subscribe((result: Array<User>) => {
      this.length = result.length;
      this.dataSource.data = result;
    });
  }

  openEditDialog(data: User): void {
    const dialogRef = this.dialog.open(DialogEdit, {
      data: data,
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getUser();
    });
  }

  delete(data: SendUpdatedUser): void {
    this.showConfirmDelete = true;
    this.deletedUser = data;
  }

  onConfirm(status: boolean) {
    this.showConfirmDelete = false;
    if (status) {
      const { _id } = this.deletedUser;
      this.adminService
        .deleteUser(this.deletedUser, _id)
        .subscribe((result: UpdateUser) => {
          this.commonService.notificationHandler(result.message);
          this.getUser();
        });
    }
  }

  getAllRoles(): void {
    this.roleService.getAllRoles({}).subscribe((result: RoleRequest[]) => {
      this.userRoles = result;
    });
  }

  getRole(id: string): string {
    return this.userRoles.length
      ? this.userRoles.find((data) => data._id === id).name
      : '';
  }
}

@Component({
  selector: 'app-edit',
  templateUrl: './edit.dialog.html',
})
export class DialogEdit implements OnInit {
  editForm: FormGroup;
  userRoles: Array<RoleRequest> = [];

  constructor(
    private _fb: FormBuilder,
    private adminService: AdminService,
    private commonService: CommonService,
    public dialogRef: MatDialogRef<AdminComponent>,
    private roleService: RoleService,
    @Inject(MAT_DIALOG_DATA) public data: SendUpdatedUser
  ) {}

  ngOnInit(): void {
    this.getAllRoles();
    this.editForm = this._fb.group({
      name: [
        this.data.name,
        [
          Validators.required,
          Validators.maxLength(250),
          Validators.minLength(3),
        ],
      ],
      email: [this.data.email, [Validators.required, Validators.email]],
      role: [this.data.role, Validators.required],
    });
  }

  edit() {
    this.adminService
      .updateUser(this.editForm.value, this.data._id)
      .subscribe((result: UpdateUser) => {
        if (result.statusCode === 200) {
          this.commonService.notificationHandler(result.message);
          this.dialogRef.close();
        }
      });
  }

  getAllRoles(): void {
    this.roleService.getAllRoles({}).subscribe((result: RoleRequest[]) => {
      this.userRoles = result;
    });
  }

  getErrorMessage(): string {
    if (this.editForm.controls['name'].status === 'INVALID') {
      if (this.editForm.controls['name'].errors['maxLength']) {
        return 'Name is too Long';
      } else if (this.editForm.controls['name'].errors['required']) {
        return 'Name is Required';
      } else if (this.editForm.controls['name'].errors['minLength']) {
        return 'Name is too Short';
      }
    } else if (this.editForm.controls['email'].status === 'INVALID') {
      if (this.editForm.controls['email'].errors['email']) {
        return 'Invalid Email';
      } else if (this.editForm.controls['email'].errors['required']) {
        return 'Email is Required';
      }
    } else if (this.editForm.controls['role'].status === 'INVALID') {
      return 'Role is Required';
    }
    return null;
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
