import { Component, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';



@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'pneu-mania';

    @HostListener('window:scroll', ['$event'])
    onScroll(event: Event) {
        let header = document.querySelector('#header')
        header?.classList.toggle('rolagem', window.scrollY > 500)
    }

}
