import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxFileDropEntry, NgxFileDropModule } from 'ngx-file-drop';
import { HttpClientService } from '../http-client.service';
import { HttpHeaders } from '@angular/common/http';
import {
  CustomToastrService,
  MessageType,
} from '../../ui/custom-toastr.service';
import { DialogService } from '../dialog.service';
import { FileState, FileUploadDialogComponent } from 'src/app/dialogs/file-upload-dialog/file-upload-dialog.component';
@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [CommonModule, NgxFileDropModule],
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css'],
})
export class FileUploadComponent {
  /**
   *
   */
  constructor(
    private httpClient: HttpClientService,
    private toastrService: CustomToastrService,
    private dialogService:DialogService
  ) {}
  public files: NgxFileDropEntry[];
  @Input() options: Partial<FileUploadOptions>;
  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    const formData = new FormData();

    for (const droppedFile of files) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          console.log(droppedFile.relativePath, file);
          formData.append(file.name, file, droppedFile.relativePath);
        });
      } else {
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }

  this.dialogService.openDialog({component:FileUploadDialogComponent,

    data:FileState.Yes,
    afterClosed:()=>{
      this.httpClient
      .post(
        {
          controller: this.options.controller,
          action: this.options.action,
          queryString: this.options.queryString,
          headers: new HttpHeaders({ responseType: 'blob' }),
        },
        formData
      )
      .subscribe((data) => {
        this.toastrService.message('Dosya eklendi', '', MessageType.Success);
      });
    }
  })

  }

  public fileOver(event) {
    console.log(event);
  }

  public fileLeave(event) {
    console.log(event);
  }
}
export class FileUploadOptions {
  controller?: string;
  action?: string;
  queryString?: string;
  explanation?: string;
  accept?: string;
}
