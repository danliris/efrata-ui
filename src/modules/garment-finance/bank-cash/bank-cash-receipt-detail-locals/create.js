import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';

@inject(Router, Service)
export class Create {
	isCreate = true;
	constructor(router, service) {
		this.router = router;
		this.service = service;
		this.data = {};
	}

	list() {
		this.router.navigateToRoute('list');
	}

	cancelCallback(event) {
		this.list();
	}

	saveCallback(event) {
		this.service.create(this.data)
			.then(result => {
				alert("Data berhasil dibuat");
				this.list();
			})
			.catch(e => {
				this.error = e;
			})
	}
}
