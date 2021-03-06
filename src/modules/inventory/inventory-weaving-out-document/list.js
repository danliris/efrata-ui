import { inject } from "aurelia-framework";
import { Service } from "./service";
import { Router } from "aurelia-router";
import moment from "moment";

@inject(Router, Service)
export class List {
  constructor(router, service) {
    this.service = service;
    this.router = router;
  }

  context = ["detail"];

  columns = [
    {
      field: "Date",
      title: "Tanggal",
      formatter: function (value, data, index) {
        return moment(value).format("DD MMM YYYY");
      },
    },
    { field: "BonNo", title: "No. Bon" },
    { field: "BonType", title: "Area Tujuan" },
    { field: "Type", title: "Status" },
  ];

  loader = (info) => {
    var order = {};
    if (info.sort) order[info.sort] = info.order;
    var arg = {
      page: parseInt(info.offset / info.limit, 10) + 1,
      size: info.limit,
      keyword: info.search,
      order: order,
    };

    return this.service.search(arg).then((result) => {
      var data = {};
      data.total = result.Total;
      data.data = result.Data;
      return data;
    });
  };

  contextCallback(event) {
    var arg = event.detail;
    var data = arg.data;
    switch (arg.name) {
      case "detail":
        this.router.navigateToRoute("view", {
          id: data.Id,
        });
        break;
    }
  }

  create() {
    this.router.navigateToRoute("create");
  }
  getExcel() {
    this.router.navigateToRoute('excel');
  }
  upload() {
    this.router.navigateToRoute('upload');
  }
}
