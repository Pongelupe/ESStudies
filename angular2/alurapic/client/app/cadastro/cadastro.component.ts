import { Component } from '@angular/core';
import { FotoComponent } from '../foto/foto.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FotoService } from '../foto/foto.service';

@Component({
    moduleId: module.id,
    selector: 'cadastro',
    templateUrl: './cadastro.component.html'
})
export class CadastroComponent {

    private foto: FotoComponent = new FotoComponent();
    meuForm: FormGroup;

    constructor(private service: FotoService, fb: FormBuilder) {
        this.meuForm = fb.group({
            titulo: ["", Validators.compose([Validators.required, Validators.minLength(4)])],
            url: ["", Validators.required],
            descricao: [""]
        })
    }

    cadastrar(event: Event) {
        event.preventDefault();
        console.log(this.foto);
        this.service
            .cadastra(this.foto)
            .subscribe(() => this.foto = new FotoComponent(),
                err => console.log(err));
    }
}