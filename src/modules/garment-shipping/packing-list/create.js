import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import { activationStrategy } from 'aurelia-router';

@inject(Router, Service)
export class Create {

    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    bind() {
        this.data = { Items: [] };
        this.error = {};
    }

    determineActivationStrategy() {
        return activationStrategy.replace; //replace the viewmodel with a new instance
        // or activationStrategy.invokeLifecycle to invoke router lifecycle methods on the existing VM
        // or activationStrategy.noChange to explicitly use the default behavior
    }

    cancelCallback(event) {
        if (confirm("Apakah Anda yakin keluar dari halaman ini?")) {
            this.router.navigateToRoute('list');
        }
    }

    saveCallback(event) {
        this.data.isShipping = true;
        this.service.create(this.data)
            .then(result => {
                alert("Data berhasil dibuat, No Invoice: " + result);
                this.router.navigateToRoute('create', {}, { replace: true, trigger: true });
            })
            .catch(error => {
                this.error = error;
            });
    }
}