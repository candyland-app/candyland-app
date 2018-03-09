import { Injectable } from '@angular/core';
import {AppConstants} from '../constants/app-constants'

@Injectable()
export class UploadImageService {
    
    filesToUpload: File[];
	private serverPath:string = AppConstants.serverPath;
    
    constructor() {
        this.filesToUpload = [];
    }

    upload(userId: number) {
        this.makeFileRequest(
            this.serverPath + '/user/add/image?id=' + userId,
            [],
            this.filesToUpload
        ).then(
            result => {
                console.log(result);
            },
            error => {
                console.log(error);
            }
        );
    }

   modify(userId: number) {
        console.log(this.filesToUpload);
        if (this.filesToUpload.length > 0) {
            this.makeFileRequest(
                this.serverPath + '/user/update/image?id=' + userId,
                [],
                this.filesToUpload
            ).then(
                result => {
                    console.log(result);
                },
                error => {
                    console.log(error);
                }
            );
        }
    }

    fileChangeEvent(fileInput: any) {
        this.filesToUpload = fileInput.target.files as File[];
    }

    makeFileRequest(url: string, params: string[], files: File[]) {
        return new Promise((resolve, reject) => {
            const formData: any = new FormData();
            const xhr = new XMLHttpRequest();
            for (const i of files) {
                formData.append('uploads[]', files[i], files[i].name);
            }
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        console.log('image uploaded successfully!');
                    } else {
                        reject(xhr.response);
                    }
                }
            };

            xhr.open('POST', url, true);
            xhr.setRequestHeader(
                'x-auth-token',
                localStorage.getItem('xAuthToken')
            );
            xhr.send(formData);
        });
    }
}
