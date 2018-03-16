import { Injectable } from '@angular/core';

@Injectable()
export class UploadImageService {
    filesToUpload: File[];

    constructor() {
        this.filesToUpload = [];
    }

    upload(eventId: number) {
        this.makeFileRequest(
            'http://localhost:8181/event/add/image?id=' + eventId,
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

    fileChangeEvent(fileInput: any) {
        this.filesToUpload = fileInput.target.files as File[];
    }

    makeFileRequest(url: string, params: string[], files: File[]) {
        return new Promise((resolve, reject) => {
            const formData: any = new FormData();
            const xhr = new XMLHttpRequest();
            for (const file of files) {
                formData.append('uploads[]', file, file.name);
            }
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        console.log('image uploaded successfully');
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
