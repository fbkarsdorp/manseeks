import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule, MatPaginatorModule, MatFormFieldModule, MatInputModule,
         MatToolbarModule, MatProgressBarModule, MatButtonModule, MatSnackBarModule,
         MatSnackBar, MatChipsModule, MatIconModule, MatSidenavModule,
         MatSlideToggleModule, MatCardModule, MatSliderModule, MatTooltipModule,
         MatTabsModule, MatSelectModule } from '@angular/material';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { AppComponent } from './app.component';
import { TableComponent } from './table/table.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ProgressbarComponent } from './progressbar/progressbar.component';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ParametersService } from './parameters.service';
import { BreakpointObserver } from '@angular/cdk/layout/typings/breakpoints-observer';
import { MatchesService } from './matches.service';
import { SettingsComponent } from './settings/settings.component';
import { ExportCsvComponent } from './export-csv/export-csv.component';
import { StatusbarComponent } from './statusbar/statusbar.component';
import { WordlistComponent } from './wordlist/wordlist.component';
import { DocpageComponent } from './docpage/docpage.component';


@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    ToolbarComponent,
    ProgressbarComponent,
    SearchbarComponent,
    SettingsComponent,
    ExportCsvComponent,
    StatusbarComponent,
    WordlistComponent,
    DocpageComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatButtonModule,
    MatSnackBarModule,
    MatProgressBarModule,
    FormsModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatIconModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatCardModule,
    MatSliderModule,
    MatTooltipModule,
    MatTabsModule,
    MatSelectModule,
  ],
  providers: [ParametersService, MatSnackBar, MatchesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
