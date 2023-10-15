import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { SpellingComponent } from './spelling/spelling.component';
import { MathComponent } from './math/math.component';
import { WordSearchComponent } from './games/word-search/word-search.component';


const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: '/spelling', pathMatch: 'full' },
      {
        path: 'spelling',
        component: SpellingComponent,
        children: [
          { path: 'word-search', component: WordSearchComponent },
          // ... other game routes
        ]
      },
      { path: 'math', component: MathComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
