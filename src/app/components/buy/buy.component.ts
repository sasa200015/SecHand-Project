import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BossService } from '../../services/boss.service';
import { Cars } from '../../interface/cars';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrl: './buy.component.css'
})
export class BuyComponent implements OnInit{
  
  CarsList: Cars[] = [];

  constructor(private afs:AngularFirestore , private service : BossService){}

  ngOnInit(): void {
    this.getAllStudents();
  }

  getAllStudents() {
    this.service.getAllStudents().subscribe(res => {

      this.CarsList = res.map((e: any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      })

    }, err => {
      alert('Error while fetching student data');
    })

  }

}
