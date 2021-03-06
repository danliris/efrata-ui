import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service';
const unitExpenditureNoteUri = 'garment-unit-expenditure-notes';
const unitDeliveryOrderUri = 'garment-unit-delivery-orders';
const preparingUri = 'garment-sample-preparings';
const serviceUri = 'garment-sample-delivery-returns';
const UnitServiceUri = 'master/units';
export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "garment-production");
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

    getPreparingByUENNo(info) {
        var endpoint = `${preparingUri}`;
        return super.list(endpoint, info);
    }

}


export class PurchasingService extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "purchasing-azure")
    }

    getExpenditureNote(info) {
        var endpoint = `${unitExpenditureNoteUri}`;
        return super.list(endpoint, info);
    }
}

export class CoreService extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "core");
    }

    getSampleUnit(info) {
        var endpoint = `${UnitServiceUri}`;
        return super.list(endpoint, info);
    }
}
