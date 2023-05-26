import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CommonService } from '../common/common.service';
import {
  Role,
  RoleLevel,
  RoleRequest,
  RoleResponse,
} from '../interfaces/role.interface';
import { RoleService } from './role.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css'],
})
export class RoleComponent implements OnInit {
  displayedColumns: string[] = ['name', 'level', 'action'];
  responseData: Array<Role> = [];
  length: number;
  pageSize: number;
  pageSizeOptions: Array<number>;
  dataSource = new MatTableDataSource<Role>(this.responseData);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(
    private roleService: RoleService,
    private commonService: CommonService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.pageSizeOptions = this.commonService.pageSizeOptions;
    this.pageSize = this.commonService.pageSize;
    this.getRoles();
  }

  getRoles(): void {
    this.roleService.getAllRoles({}).subscribe((result: Role[]) => {
      this.length = result.length;
      this.dataSource.data = result;
    });
  }

  openEditDialog(data: RoleRequest): void {
    debugger;
    const dialogRef = this.dialog.open(DialogRoleEdit, {
      data: data,
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getRoles();
    });
  }

  delete(role: RoleRequest): void {
    const { _id } = role;
    this.roleService.deleteRole(role, _id).subscribe((result: RoleResponse) => {
      if (result.statusCode === 200) {
        this.commonService.notificationHandler(result.message);
        this.getRoles();
      }
    });
  }
}

@Component({
  selector: 'app-roleEdit',
  templateUrl: './roleEdit.dialog.html',
})
export class DialogRoleEdit implements OnInit {
  editRoleForm: FormGroup;
  roleLevels: RoleLevel[];

  constructor(
    private _fb: FormBuilder,
    private roleService: RoleService,
    private commonService: CommonService,
    public dialogRef: MatDialogRef<RoleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RoleRequest
  ) {}

  ngOnInit(): void {
    this.editRoleForm = this._fb.group({
      name: [
        this.data.name,
        [
          Validators.required,
          Validators.maxLength(250),
          Validators.minLength(3),
        ],
      ],
      level: [this.data.level._id, [Validators.required]],
    });
    this.getRoleLevels();

  }

  getRoleLevels(): void {
    this.roleService.getAllRoleLevels().subscribe((result: RoleLevel[]) => {
      this.roleLevels = result;
    });
  }

  edit() {
    this.roleService
      .updateRole(this.editRoleForm.value, this.data._id)
      .subscribe((result: RoleResponse) => {
        if (result.statusCode === 200) {
          this.commonService.notificationHandler(result.message);
          this.dialogRef.close();
        }
      });
  }

  getErrorMessage(): string {
    if (this.editRoleForm.controls['name'].status === 'INVALID') {
      if (this.editRoleForm.controls['name'].errors['maxLength']) {
        return 'Name is too Long';
      } else if (this.editRoleForm.controls['name'].errors['required']) {
        return 'Name is Required';
      } else if (this.editRoleForm.controls['name'].errors['minLength']) {
        return 'Name is too Short';
      }
    } else if (this.editRoleForm.controls['level'].status === 'INVALID') {
      return 'Level is Required';
    }
    return null;
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
