import { Component } from '@angular/core';
import { FotoService } from '../foto/foto.service';
import { FotoComponent } from '../foto/foto.component';

@Component({
    moduleId: module.id,
    selector: 'listagem',
    templateUrl: './listagem.component.html'
})
export class ListagemComponent {
    private fotos: Array<FotoComponent> = [];
    private mensagem = '';

    constructor(private service: FotoService) {
        this.lista()
    }

    lista(): void {
        this.service.lista()
            .subscribe(fotos => this.fotos = fotos,
                err => console.log(err));
    }

    remove(foto: FotoComponent): void {
        this.service.remove(foto)
            .subscribe(() => {
                this.mensagem = 'Foto removida com sucesso';
                let novasFotos = this.fotos.slice(0);
                let indice = novasFotos.indexOf(foto);
                novasFotos.splice(indice, 1);
                this.fotos = novasFotos;
            }, err => this.mensagem = `Erro ao remover a foto de ${foto.titulo}`);
    }
}