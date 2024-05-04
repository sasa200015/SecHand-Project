import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Storage ,ref,uploadBytes,getDownloadURL, uploadBytesResumable, StorageReference,} from '@angular/fire/storage';
import { Observable, finalize, from, switchMap } from 'rxjs';
import { Cars } from '../interface/cars';

@Injectable({
  providedIn: 'root'
})
export class BossService {

  constructor(private storage:AngularFireStorage,private afs:AngularFirestore) { }

  //////-------------------------- upload image : -----------------------------------///////

  uploadImage(file: File): Promise<string> {
    const filePath = `images/${file.name}`;
    const fileRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, file);

    return new Promise((resolve, reject) => {
      uploadTask.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            resolve(url);
          }, (error) => {
            reject(error);
          });
        })
      ).subscribe();
    });
  }
  //// ------------------------ add car : -------------------------------------//

  addStudent(car : Cars) {
    car.id = this.afs.createId();
    return this.afs.collection('/cars').add(car);
  }
///////------------------------Display the Data ---------------------------------///////////
  getAllStudents() {
    return this.afs.collection('/cars').snapshotChanges();
  }

}
