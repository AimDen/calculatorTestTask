import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AppCalculatorComponent} from './app-calculator.component';
import {DatePipe} from "@angular/common";
import {CalculatorService} from "../../services/calculator.service";


describe('AppCalculatorComponent', () => {
  let component: AppCalculatorComponent;
  let fixture: ComponentFixture<AppCalculatorComponent>;
  let mockCalculatorService: CalculatorService;

  function findElementByTestId(testId: string): HTMLElement {
    const element = fixture.debugElement.nativeElement.querySelector(
      `[data-testid="${testId}"]`
    ) as HTMLElement;

    return element;
  }

  beforeEach(async () => {
    mockCalculatorService = jasmine.createSpyObj<CalculatorService>('CalculatorService', ['updateTable']);
    await TestBed.configureTestingModule({
      declarations: [AppCalculatorComponent],
      providers: [DatePipe,
        {provide: CalculatorService, useValue: mockCalculatorService}]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call pressNum method if number was clicked', () => {
    const numberButton = findElementByTestId('number-button1');
    const spy = spyOn(component, 'pressNum');
    numberButton.click();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });
  it('should display number if number was clicked', () => {
    const numberButton = findElementByTestId('number-button1');
    const inputField = findElementByTestId('input-field');
    numberButton.click();
    fixture.detectChanges();
    expect(inputField.textContent).toBe('1');
  });
  it('should not display number if 0 was clicked', () => {
    const numberButton = findElementByTestId('number-button0');
    const inputField = findElementByTestId('input-field');
    numberButton.click();
    fixture.detectChanges();
    expect(inputField.textContent).toBe('');
  });
  it('should call pressOperator method if operator was clicked', () => {
    const operatorButton = findElementByTestId('operator-button');
    const spy = spyOn(component, 'pressOperator');
    operatorButton.click();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });
  it('should not render operator if it is nothing in input field', () => {
    const operatorButton = findElementByTestId('operator-button');
    const inputField = findElementByTestId('input-field');
    operatorButton.click();
    fixture.detectChanges();
    expect(inputField.textContent).toBe('');
  });
  it('should render operator', () => {
    const operatorButton = findElementByTestId('operator-button');
    const inputField = findElementByTestId('input-field');
    component.input = '1';
    operatorButton.click();
    fixture.detectChanges();
    expect(inputField.textContent).toBe('1/');
  });
  it('should remove one symbol if clear button was clicked', () => {
    const clearButton = findElementByTestId('clear-button');
    const inputField = findElementByTestId('input-field');
    component.input = '12';
    clearButton.click();
    fixture.detectChanges();
    expect(inputField.textContent).toBe('1');
  });
  it('should remove all values from input', () => {
    const clearButton = findElementByTestId('clearAll-button');
    const inputField = findElementByTestId('input-field');
    component.input = '12';
    clearButton.click();
    fixture.detectChanges();
    expect(inputField.textContent).toBe('');
  });
  it('should call calcAnswer method', () => {
    const getAnswerBtn = findElementByTestId('get-answer-button');
    const spy = spyOn(component, 'calcAnswer');
    getAnswerBtn.click();
    expect(spy).toHaveBeenCalled();
  });
  it('should render result', () => {
    component.input = '1+2';
    component.getAnswer();
    expect(component.input).toBe('3');
  });
  it('should call calculatorService', () => {
    component.input = '1+2';
    component.getAnswer();
    expect(mockCalculatorService.updateTable).toHaveBeenCalled();
  })
});
