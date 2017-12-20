import {Component, Inject, OnInit} from '@angular/core';
import {PropertyValue, Value, ValueLiteral} from "../specify-property-value.component";
import {AppConfig} from "../../../../../../../app.config";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {JDNConvertibleCalendarModule} from "jdnconvertiblecalendar/src/JDNConvertibleCalendar";

@Component({
    selector: 'date-value',
    templateUrl: './date-value.component.html',
    styleUrls: ['./date-value.component.scss']
})
export class DateValueComponent implements OnInit, PropertyValue {

    type = AppConfig.DateValue;

    form: FormGroup;

    constructor(@Inject(FormBuilder) private fb: FormBuilder) {

        this.form = this.fb.group({
            dateValue: [null, Validators.compose([Validators.required])]
        });

        this.form.valueChanges.subscribe((data) => {
            //console.log(data);
        });

    }

    ngOnInit() {
    }

    getValue(): Value {

        const dateObj: JDNConvertibleCalendarModule.JDNConvertibleCalendar = this.form.value.dateValue;

        // get calendar format
        const calendarFormat = dateObj.calendarFormat;

        const calendarPeriod = dateObj.toCalendarPeriod();

        const dateString = `${calendarFormat.toUpperCase()}:${calendarPeriod.periodStart.year}-${calendarPeriod.periodStart.month}-${calendarPeriod.periodStart.day}:${calendarPeriod.periodEnd.year}-${calendarPeriod.periodEnd.month}-${calendarPeriod.periodEnd.day}`;

        return new ValueLiteral(String(dateString), AppConfig.xsdString);
    }
}
