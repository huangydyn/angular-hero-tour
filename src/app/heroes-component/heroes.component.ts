import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero-detail-component/hero';
import { HeroService } from '../hero-detail-component/hero.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-heroes-component',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: Hero[];
  selectedHero: Hero;
  heroForm: FormGroup;

  constructor(private  heroService: HeroService,
              private router: Router,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.heroForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.maxLength(10)]],
      address: [null, [Validators.required, Validators.maxLength(11)]],
    });
    this.heroService.getHeroes().then(heroes => this.heroes = heroes);
  }

  onSelect(hero: Hero) {
    this.selectedHero = hero;
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }

  onSave(name: string): void {
    this.heroService.create(this.heroForm.value)
      .then(hero => {
        this.heroes.push(hero);
        this.selectedHero = null;
      });
  }

  delete(hero): void {
    this.heroService
      .delete(hero.id)
      .then(() => {
        this.heroes = this.heroes.filter(h => h !== hero);
        if (this.selectedHero === hero) { this.selectedHero = null; }
      });
  }
}
