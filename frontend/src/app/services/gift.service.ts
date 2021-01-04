import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FilterParamsModel } from '../models/filter-params-model';
import { Gift, GiftAway, GiftPaginationModel } from '../models/gift';

@Injectable({
    providedIn: 'root'
})
export class GiftService {
    private apiUrl: string = environment.baseURL;

    constructor(private http: HttpClient) {}

    public fetchGifts(requestParams: FilterParamsModel): Observable<GiftPaginationModel> {
        let params = new HttpParams();
        if (requestParams != null) {
            Object.keys(requestParams).forEach(key => {
                const value = requestParams[key];
                if (value != null) {
                    params = params.set(key, value.toString());
                }
            });
        }
		return this.http.get<GiftPaginationModel>(environment.baseURL + 'gift', {
            params
        });
    }

    public fetchAllGifts() {
        return this.http.get(this.apiUrl + 'gift/all');
    }

    public create(gift: Gift): Observable<void> {
        const httpOptions: object = { responseType: 'text' };
        return this.http.post<void>(this.apiUrl + 'gift', gift);
    }

    public update(id: number, gift: Gift): Observable<void> {
        const httpOptions: object = { responseType: 'text' };
        return this.http.put<void>(this.apiUrl + `gift/${id}`, gift, httpOptions);
    }

    public delete(id: number) {
        return this.http.delete(this.apiUrl + `gift/${id}`);
    }

    public myGifts() {
        return this.http.get(this.apiUrl + 'myGifts');
    }

    public deleteMyGift(id: number) {
        return this.http.delete(this.apiUrl + `myGifts/${id}`);
    }

    public getNewGift() {
        return this.http.get(this.apiUrl + 'myGifts/redeem');
    }

    public giftMyGift(gift: GiftAway) {
        return this.http.put(this.apiUrl + 'myGifts', gift);
    }

    public getMyWishList() {
        return this.http.get(this.apiUrl + 'myGifts/wishlist');
    }

    public getGiftsNotOnMyList() {
        return this.http.get(this.apiUrl + 'myGifts/wishlist/available');
    }

    public addToMyWishList(id: number) {
        return this.http.post(this.apiUrl + `myGifts/wishlist/${id}`, {});
    }

    public deleteFromMyList(id: number) {
        return this.http.delete(this.apiUrl + `myGifts/wishlist/${id}`);
    }
}
