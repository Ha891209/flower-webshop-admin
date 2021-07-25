import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Flower } from 'src/app/model/flower';
import { ConfigService, ITableCol, SelectedToDelete } from 'src/app/service/config.service';
import { FlowerService } from 'src/app/service/flower.service';

@Component({
  selector: 'app-flowers',
  templateUrl: './flowers.component.html',
  styleUrls: ['./flowers.component.scss']
})
export class FlowersComponent implements OnInit {

  tableColumns: ITableCol[] = this.config.flowerTableCols;
  list$: Observable<Flower[]> = this.flowerService.list$;
  selectedToDelete: SelectedToDelete = this.config.selectedToDeleteMovie;


  constructor(
    private config: ConfigService,
    private flowerService: FlowerService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.flowerService.getAll();
  }

  onClickDelete(movie: Flower): void {
    this.flowerService.remove(movie)
      .subscribe(
        () => {
          this.flowerService.getAll();
          this.router.navigate(['/flowers']);
        }
      )
  }
}