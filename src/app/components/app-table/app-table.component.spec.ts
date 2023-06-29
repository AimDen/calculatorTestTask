import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AppTableComponent} from './app-table.component';
import {CalculatorService} from "../../services/calculator.service";
import {BehaviorSubject} from "rxjs";

describe('AppTableComponent', () => {
  let component: AppTableComponent;
  let fixture: ComponentFixture<AppTableComponent>;
  let mockCalculatorService: Partial<CalculatorService>;

  function findElementByTestId(testId: string): HTMLElement {
    const element = fixture.debugElement.nativeElement.querySelector(
      `[data-testid="${testId}"]`
    ) as HTMLElement;

    return element;
  }

  beforeEach(async () => {
    mockCalculatorService = {
      // @ts-ignore
      tableSource$: new BehaviorSubject([{time: '01.01.01', operation: '1+1', result: '2'}])
    }
    await TestBed.configureTestingModule({
      declarations: [AppTableComponent],
      providers: [{provide: CalculatorService, useValue: mockCalculatorService}]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should render table if data is', () => {
    const table = findElementByTestId('history-table');
    mockCalculatorService.tableSource$?.next([{time: '01.01.01', operation: '1+1', result: '2'}]);
    fixture.detectChanges();
    expect(table).toBeDefined();
  })
});
