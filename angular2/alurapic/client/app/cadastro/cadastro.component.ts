import { Component } from '@angular/core';
import { FotoComponent } from '../foto/foto.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    moduleId: module.id,
    selector: 'cadastro',
    templateUrl: './cadastro.component.html'
})
export class CadastroComponent {

    private foto: FotoComponent = new FotoComponent();
    private meuForm: FormGroup;

    constructor(fb: FormBuilder) {
        this.meuForm = fb.group({
            titulo: ["", Validators.compose([Validators.required, Validators.minLength(4)])],
            url: ["", Validators.required],
            descricao: [""]
        })
    }

    cadastrar(event: Event) {
        event.preventDefault();
        console.log(this.foto);

    }
}