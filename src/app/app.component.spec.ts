import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let compiledElement: { querySelector: (arg0: string) => any };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [ReactiveFormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    compiledElement = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'predictX'`, () => {
    expect(component.title).toEqual('predictX');
  });

  it('should have App title as Predictx', () => {
    const title = fixture.debugElement.query(By.css('.title')).nativeElement
      .innerHTML;
    expect(title).toEqual('PredictX');
  });

  it('onsubmit method should be called on click of submit', () => {
    const submitSpy = spyOn(component, 'onSubmit');

    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('ngSubmit', null);
    expect(submitSpy).toHaveBeenCalled();
  });

  it('firstValue should be empty', () => {
    component.firstValue.setValue('');
    expect(component.firstValue.value).toEqual('');
  });

  it('firstValue should be populated and accept values', () => {
    component.firstValue.setValue('my&friend&Paul has heavy hats! &');
    expect(component.firstValue.value).toEqual(
      'my&friend&Paul has heavy hats! &'
    );
  });

  it('secondValue should be empty', () => {
    component.secondValue.setValue('');
    expect(component.secondValue.value).toEqual('');
  });

  it('secondValue should be populated and accept values', () => {
    component.secondValue.setValue('my friend John has many many friends &');
    expect(component.secondValue.value).toEqual(
      'my friend John has many many friends &'
    );
  });
});
