import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-precio',
  templateUrl: './precio.page.html',
  styleUrls: ['./precio.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class PrecioPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
