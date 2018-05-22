import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By } from "@angular/platform-browser";
import { AppComponent } from './app.component';
import { DataService } from './data.service';
import { AppComponentHost } from './app.component.host';

describe('AppComponent', () => {
  let component: AppComponentHost;
  let fixture: ComponentFixture<AppComponentHost>;
  let dataService: DataService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppComponent, AppComponentHost],
      providers: [ DataService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponentHost);
    component = fixture.componentInstance;
    dataService = TestBed.get(DataService);
    fixture.detectChanges();
  });

  it('when the page loads, results are empty', () => {
    let partDiv = fixture.debugElement.query(By.css('.async-pipe-result'));
    expect(partDiv).toBeNull();
  });

  it('when the data service is triggered for the first time, app should update results via async pipe', () => {
    dataService.triggerVisibility();
    fixture.detectChanges();
    let partDiv = fixture.debugElement.query(By.css('.async-pipe-result')).nativeElement;
    expect(partDiv.innerText).toBe('Updated via async pipe');
  });

  it('given the data service has been triggered, when it gets reset, the text should disappear', () => {
    // arrange
    dataService.triggerVisibility();
    fixture.detectChanges();
    let partDiv = fixture.debugElement.query(By.css('.async-pipe-result')).nativeElement;
    expect(partDiv.innerText).toBe('Updated via async pipe');

    // act
    dataService.reset();
    fixture.detectChanges();

    // assert
    partDiv = fixture.debugElement.query(By.css('.async-pipe-result'));
    expect(partDiv).toBeNull();
  });
});
