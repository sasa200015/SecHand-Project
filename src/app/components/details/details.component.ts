import { Component, OnInit } from '@angular/core';
import { BossService } from '../../services/boss.service';
import { Cars } from '../../interface/cars';
import { Observable, Subscription, filter, switchMap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit{

  car: Cars | undefined;
  private subscription: Subscription | undefined;

  constructor(private route: ActivatedRoute,private routes:Router,private afs:AngularFirestore, private bossService: BossService) { }

  ngOnInit(): void {
    const carId = this.route.snapshot.paramMap.get('id');
    if (carId) {
      this.subscription = this.bossService.getCarById(carId).subscribe({
        next: (car: Cars) => {
          this.car= car;
        },
        error: (err) => {
          console.error('Error fetching car details:', err);
        }
      });
      }
  }

  buyCar(): void {
    if (this.car) {
      this.car = undefined;
      const carId = this.route.snapshot.paramMap.get('id');
      if (carId) {
        this.afs.collection('cars').doc(carId).delete()
          .then(() => {
            alert(' Congratulations For Having This Exotic Car : ')
            setTimeout(() => {
              this.routes.navigate(['/buy']); // Redirect to buy page after 2 seconds
            }, 400);
          })
          .catch((error) => {
            console.error('Error deleting car from Firestore:', error);
          });
      }
    }
  }
}
