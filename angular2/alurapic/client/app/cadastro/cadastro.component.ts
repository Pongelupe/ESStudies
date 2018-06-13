import { Component } from '@angular/core';
import { FotoComponent } from '../foto/foto.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FotoService } from '../foto/foto.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'cadastro',
    templateUrl: './cadastro.component.html'
})
export class CadastroComponent {

    private foto: FotoComponent = new FotoComponent();
    meuForm: FormGroup;
    mensagem: string = '';

    constructor(private service: FotoService, fb: FormBuilder, private route: ActivatedRoute, private router: Router) {
        this.meuForm = fb.group({
            titulo: ["", Validators.compose([Validators.required, Validators.minLength(4)])],
            url: ["", Validators.required],
            descricao: [""]
        })

        this.route.params.subscribe(params => {
            let id = params['id'];
            if (id)
                this.service.buscaPorId(id)
                    .subscribe(foto => this.foto = foto, err => console.log(err));
        });
    }

    cadastrar(event: Event) {
        event.preventDefault();
        console.log(this.foto);
        this.service
            .cadastra(this.foto)
            .subscribe((res) => {
                this.mensagem = res.mensagem;
                this.foto = new FotoComponent();
                if (!res.inclusao) this.router.navigate(['']);

            }, err => console.log(err));
    }
}