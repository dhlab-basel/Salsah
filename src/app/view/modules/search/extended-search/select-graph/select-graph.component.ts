import {Component, Inject, Input, OnInit, Output} from '@angular/core';
import {NamedGraph} from "../../../../../model/services/ontologycache.service";
import {MatSelectChange} from "@angular/material";
import {EventEmitter} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'select-graph',
  templateUrl: './select-graph.component.html',
  styleUrls: ['./select-graph.component.scss']
})
export class SelectGraphComponent implements OnInit {

  @Input() namedGraphs: Array<NamedGraph>;

  @Output() namedGraph = new EventEmitter<string>();

  form: FormGroup;

  constructor(@Inject(FormBuilder) fb: FormBuilder) {
      this.form = fb.group({
          namedGraph: [null, Validators.required]
      });
  }

  ngOnInit() {

  }

  namedGraphChosen(change: MatSelectChange) {

      this.namedGraph.emit(change.value);

  }

}
