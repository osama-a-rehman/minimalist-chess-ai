import { Component } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {
	public goToCodePen() {
		window.open('https://codepen.io/ilkerkurtel/pen/MWaJzzw', '_blank');
	}
}
