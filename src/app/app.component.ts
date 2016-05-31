import { Component, OnInit } from '@angular/core';

import { DefaultComponent } from './default';

@Component({
    moduleId: module.id,
    selector: 'ft-app',
    templateUrl: 'app.component.html',
    directives: [ DefaultComponent ]
})
export class AppComponent implements OnInit {
    constructor() { }

    ngOnInit() { }

}