/**
 * Created by thanhquanky on 4/10/15.
 */
/// <reference path="../../typings/angularjs/angular.d.ts"/>
/// <reference path="../../typings/angularjs/angular-resource.d.ts"/>

module ngPharm.Services {
    export class InvoiceService {
        static $inject = ['$resource'];
        resource: ng.resource.IResourceService

        constructor($resource: ng.resource.IResourceService) {

        }


    }
}