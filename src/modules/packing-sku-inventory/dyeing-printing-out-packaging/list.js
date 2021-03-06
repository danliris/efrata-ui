import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';

@inject(Router, Service)
export class List {


    context = ["detail packinglist", "detail bon"]

    columns = [
        {
            field: "date", title: "Tanggal", formatter: function (value, data, index) {
                return moment(value).format("DD MMM YYYY");
            }
        },
        { field: "bonNo", title: "No. Bon" },
        { field: "shift", title: "Shift" },
        { field: "group", title: "Group" },
        { field: "destinationArea", title: "Area Tujuan" }
    ];

    loader = (info) => {
        var order = {};
        if (info.sort)
            order[info.sort] = info.order;
        var arg = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            keyword: info.search,
            order: order,
        }

        return this.service.search(arg)
            .then(result => {
                var data = {}
                data.total = result.total;
                data.data = [];
                result.data.forEach((item,index)=>{
                    // item.packagingProductionOrders.forEach((i,ind)=>{
                        var dataView = {};
                        dataView.id = item.id;
                        dataView.date = item.date;
                        dataView.bonNo = item.bonNo;
                        // dataView.noSpp = i.productionOrder.no,
                        // dataView.buyer = i.buyer,
                        dataView.shift = item.shift,
                        // dataView.material = i.construction,
                        // dataView.unit = i.unit,
                        // dataView.qtyOrder = i.qtyOrder,
                        dataView.group = item.group,
                        // dataView.keterangan = i.keterangan,
                        // dataView.warna = i.color,
                        // dataView.motif = i.motif,
                        // dataView.grade = i.grade,
                        // dataView.mtr = i.mtrLength,
                        // dataView.yds = i.ydsLength,
                        // dataView.saldo = i.balance,
                        // dataView.packagingType= i.packagingType,
                        // dataView.packagingQty = i.packagingQTY,
                        // dataView.packagingUnit = i.packagingUnit
                        dataView.destinationArea = item.destinationArea
                        data.data.push(dataView);
                    // });
                });
                return data;
            });
    }

    constructor(router, service) {
        this.service = service;
        this.router = router;

    }

    contextClickCallback(event) {
        var arg = event.detail;
        var data = arg.data;
        switch (arg.name) {
            case "detail packinglist":
                this.router.navigateToRoute('view', { id: data.id });
                break;
            case "print packingList":
                this.service.getPdfById(data.id);
                break;

            case "detail bon":
                this.router.navigateToRoute('view-bon', { id: data.id });
                break;
        }
    }

    contextShowCallback(index, name, data) {
        switch (name) {
            case "print":
                return data;
            default:
                return true;
        }
    }


    create() {
        this.router.navigateToRoute('create');
    }
    downloadExcel(){
        this.router.navigateToRoute('excel');
    }
}

