import {NgModule} from '@angular/core';
import {
    MdCoreModule,
    MdCheckboxModule,
    MdAutocompleteModule,
    MdInputModule,
    MdSelectModule,
    MdMenuModule,
    MdToolbarModule,
    MdListModule,
    MdGridListModule,
    MdCardModule,
    MdTabsModule,
    MdButtonModule,
    MdButtonToggleModule,
    MdChipsModule,
    MdIconModule,
    MdProgressSpinnerModule,
    MdProgressBarModule,
    MdDialogModule,
    MdTooltipModule
} from '@angular/material';

@NgModule({
    imports: [
        MdCoreModule,
        MdCheckboxModule,
        MdAutocompleteModule,
        MdInputModule,
        MdSelectModule,
        MdMenuModule,
        MdToolbarModule,
        MdListModule,
        MdGridListModule,
        MdCardModule,
        MdTabsModule,
        MdButtonModule,
        MdButtonToggleModule,
        MdChipsModule,
        MdIconModule,
        MdProgressSpinnerModule,
        MdProgressBarModule,
        MdDialogModule,
        MdTooltipModule
    ],

    exports: [
        MdCoreModule,
        MdCheckboxModule,
        MdAutocompleteModule,
        MdInputModule,
        MdSelectModule,
        MdMenuModule,
        MdToolbarModule,
        MdListModule,
        MdGridListModule,
        MdCardModule,
        MdTabsModule,
        MdButtonModule,
        MdButtonToggleModule,
        MdChipsModule,
        MdIconModule,
        MdProgressSpinnerModule,
        MdProgressBarModule,
        MdDialogModule,
        MdTooltipModule
    ]
})
export class AppMaterialModule {
}
