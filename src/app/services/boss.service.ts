import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Storage ,ref,uploadBytes,getDownloadURL, uploadBytesResumable, StorageReference,} from '@angular/fire/storage';
import { Observable, finalize, from, switchMap } from 'rxjs';
import { Cars } from '../interface/cars';
import { map } from 'rxjs/operators';

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

  addCar(car : Cars) {
    car.id = this.afs.createId();
    return this.afs.collection('/cars').add(car);
  }

///////------------------------Display the Data ---------------------------------///////////

  getAllCars() {
    return this.afs.collection('/cars').snapshotChanges();
  }

 ///////----------------------Display The Specific Car------------------------///////////

  getCarById(carId: string): Observable<Cars> {
    return this.afs.collection('/cars').doc(carId).valueChanges() as Observable<Cars>;
  }

  ////------------------------- Delete The car When Buyed ------------------------////

  deleteCar(car: Cars): Promise<void> {
    return this.afs.collection('/cars').doc(car.id).delete();
  }
}
