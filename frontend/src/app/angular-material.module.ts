import { ModuleWithProviders, NgModule} from "@angular/core";
import { MatIconRegistry } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
    imports: [
        MatFormFieldModule,
        MatInputModule,
        MatPaginatorModule,
        MatToolbarModule
    ],
    exports: [
        MatFormFieldModule,
        MatInputModule,
        MatPaginatorModule,
        MatToolbarModule
    ],
    providers: [     
    ]
})
export class AngularMaterialModule {
    constructor(public matIconRegistry: MatIconRegistry) {
        // matIconRegistry.registerFontClassAlias('fontawesome', 'fa');
    }

    static forRoot(): ModuleWithProviders {
        return {
            ngModule: AngularMaterialModule,
            providers: [MatIconRegistry]
        };
    }
}