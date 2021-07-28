import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Flower } from 'src/app/model/flower';
import { FlowerService } from 'src/app/service/flower.service';

@Component({
  selector: 'app-flower-edit',
  templateUrl: './flower-edit.component.html',
  styleUrls: ['./flower-edit.component.scss']
})
export class FlowerEditComponent implements OnInit {

  flower: Flower = new Flower();
  flowerId: string = '';
  updated: boolean = false;

  constructor(
    private flowerService: FlowerService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      params => {
        this.flowerId = params.id
        console.log(params)
      }
    );
    this.flowerService.get(parseInt(this.flowerId)).subscribe(
      flower => {
      this.flower = flower
    }
    );
  }

  setFlowerToDatabase(flower: Flower): void {
    this.updated = true;
    if (parseInt(this.flowerId) === 0) {
      this.flowerService.create(flower).subscribe(
        () => {
          this.updated = false;
          this.router.navigate(['flowers']);
        }
      );
    } else {
      this.flowerService.update(flower).subscribe(
        () => {
          this.updated = false;
          this.router.navigate(['flowers']);
        }
      );
    }
  }

}