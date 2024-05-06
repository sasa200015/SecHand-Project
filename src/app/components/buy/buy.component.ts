import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BossService } from '../../services/boss.service';
import { Cars } from '../../interface/cars';
import { map } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrl: './buy.component.css'
})
export class BuyComponent implements OnInit{
  
  CarsList: Cars[] = [];
  sortedBy: string = ''; // to keep track of sorting criteria


  constructor(private afs:AngularFirestore , private service : BossService , private router: Router){}

  ngOnInit(): void {
    this.getAllCars();
  }

  getAllCars() {
    this.service.getAllStudents() 
    .pipe(
      map(res => res.map((e: any) => {
        const data = e.payload.doc.data() as Cars;
        data.id = e.payload.doc.id;
        return data;
      }))
    )
    .subscribe(
      (data: Cars[]) => {
        this.CarsList = data;
        if (this.sortedBy) {
          this.sortCars(this.sortedBy);
        }
      },
      err => {
        alert('Error while fetching car data');
      }
    );
  }
sortCars(option: string) {
  this.sortedBy = option; 
  switch (option) {
      case 'recent' :
        this.getAllCars();
        break;
      case 'pHtoL':
          this.CarsList.sort((a, b) => Number(b.price) - Number(a.price));
          break;
      case 'pLtoH':
          this.CarsList.sort((a, b) => Number(a.price) - Number(b.price));
          break;
      case 'kmHtoL':
          this.CarsList.sort((a, b) => Number(b.kilometer) - Number(a.kilometer));
          break;
      case 'kmLtoH':
          this.CarsList.sort((a, b) => Number(a.kilometer) - Number(b.kilometer));
          break;
      case 'yNtoo':
          this.CarsList.sort((a, b) => Number(b.year) - Number(a.year));
          break;
      case 'yOtoN':
          this.CarsList.sort((a, b) => Number(a.year) - Number(b.year));
          break;
  }
}


}
