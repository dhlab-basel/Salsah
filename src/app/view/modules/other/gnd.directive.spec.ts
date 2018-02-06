import {GndDirective} from './gnd.directive';
import {Component, DebugElement, ElementRef, OnInit} from "@angular/core";
import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {By} from "@angular/platform-browser";

class MockElementRef implements ElementRef {
    nativeElement = {};
}

/**
 * Test component for a GND/IAF identifier.
 */
@Component({
    template: `<span [gnd]="'(DE-588)118696149'"></span>`
})
class TestGndComponent1 {}

/**
 * Test component for a VIAF identifier.
 */
@Component({
    template: `<span [gnd]="'(VIAF)22936072'"></span>`
})
class TestGndComponent2 {}

/**
 * Test component for normal text.
 */
@Component({
    template: `<span [gnd]="'normal text'"></span>`
})
class TestGndComponent3 {}

/**
 * Test component for long normal text.
 */
@Component({
    template: `<span [gnd]="'normal text that is quite long an will not even be looked at because it cannot possibly be a GND/IAF or VIAF identifier'"></span>`
})
class TestGndComponent4 {}

describe('GndDirective', () => {

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ TestGndComponent1, TestGndComponent2, TestGndComponent3, TestGndComponent4, GndDirective ],
            providers: [
                { provide: ElementRef, useClass: MockElementRef }
            ]
        }).compileComponents();

        //directiveEl = fixture.debugElement.query(By.directive(GndDirective));
        //let directiveInstance = directiveEl.injector.get(GndDirective);

    }));

    it('should create an instance', () => {

        const directive = new GndDirective(new MockElementRef());
        expect(directive).toBeTruthy();

    });

    it('should transform a GND/IAF identifier to a hyperlink pointing to the resolver', () => {

        let fixture: ComponentFixture<TestGndComponent1> = TestBed.createComponent(TestGndComponent1);
        fixture.detectChanges();

        let spanEle: DebugElement = fixture.debugElement.query(By.css('span'));

        expect(spanEle.nativeElement.innerHTML).toEqual("<a href=\"http://d-nb.info/gnd/118696149\" target=\"_blank\">(DE-588)118696149</a>")

    });

    it('should transform a VIAF identifier to a hyperlink pointing to the resolver', () => {

        let fixture: ComponentFixture<TestGndComponent1> = TestBed.createComponent(TestGndComponent2);
        fixture.detectChanges();

        let spanEle: DebugElement = fixture.debugElement.query(By.css('span'));

        expect(spanEle.nativeElement.innerHTML).toEqual("<a href=\"https://viaf.org/viaf/22936072\" target=\"_blank\">(VIAF)22936072</a>")

    });

    it('should not transform normal text', () => {

        let fixture: ComponentFixture<TestGndComponent1> = TestBed.createComponent(TestGndComponent3);
        fixture.detectChanges();

        let spanEle: DebugElement = fixture.debugElement.query(By.css('span'));

        expect(spanEle.nativeElement.innerHTML).toEqual("normal text")

    });

    it('should not transform long normal text', () => {

        let fixture: ComponentFixture<TestGndComponent1> = TestBed.createComponent(TestGndComponent4);
        fixture.detectChanges();

        let spanEle: DebugElement = fixture.debugElement.query(By.css('span'));

        expect(spanEle.nativeElement.innerHTML).toEqual("normal text that is quite long an will not even be looked at because it cannot possibly be a GND/IAF or VIAF identifier")

    });


});
