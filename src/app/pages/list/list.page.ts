import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Artist } from 'src/app/interfaces/artist';
import { ArtistsService } from 'src/app/services/artists.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  public artists = new Array<Artist>();
  private artistsSubscription: Subscription;

  constructor(private artistService: ArtistsService) {
    this.artistsSubscription = this.artistService.getArtists().subscribe(data => {
      this.artists = data;
    });
  }

  ngOnInit() {
  }

  OnDestroy() {
    this.artistsSubscription.unsubscribe();
  }
}
