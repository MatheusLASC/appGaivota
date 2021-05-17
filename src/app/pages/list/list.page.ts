import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Artist } from 'src/app/interfaces/artist';
import { Hq } from 'src/app/interfaces/hq';
import { ArtistsService } from 'src/app/services/artists.service';
import { HqsService } from 'src/app/services/hqs.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  public artists = new Array<Artist>();
  public hqs = new Array<Hq>();
  private hqsSubscription: Subscription;

  constructor(private hqService: HqsService, private artistService: ArtistsService) {
  }

  ngOnInit() {
    this.hqsSubscription = this.hqService.getHqs().subscribe(data => {
      this.hqs = data;
      this.hqs.forEach(hq => {
        hq.idartists.forEach(idartist => {
          this.artistService.getArtist(idartist).subscribe(res =>
            {
              if (hq.artists){
              hq.artists.push(res);
              }
              else{
                hq.artists = [];
                hq.artists.push(res);
              }
            });
        });
      });
    });
  }

  OnDestroy() {
    this.hqsSubscription.unsubscribe();
  }
}
