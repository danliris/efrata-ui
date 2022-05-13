import {inject, Lazy} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {RestService} from '../../../utils/rest-service';

const serviceUri = 'contacts';

export class Service extends RestService {

	constructor(http, aggregator, config, api) {
		super(http, aggregator, config, "deal-tracking");
	}

	search(info) {
		var endpoint = `${serviceUri}`;
		return super.list(endpoint, info);
	}

	getById(id) {
		var endpoint = `${serviceUri}/${id}`;
		return super.get(endpoint);
	}

	create(data) {
		var endpoint = `${serviceUri}`;
		return super.post(endpoint, data);
	}

	update(data) {
		var endpoint = `${serviceUri}/${data.Id}`;
		return super.put(endpoint, data);
	}

	delete(data) {
		var endpoint = `${serviceUri}/${data.Id}`;
		return super.delete(endpoint, data);
	}
}
