import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient} from '@angular/common/http';
import { Friend } from '../models/friend';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FriendService {
    private apiUrl: string = environment.baseURL;

    constructor(private http: HttpClient) { }

    public fetchFriends():Observable<Friend[]> {
        return this.http.get<Friend[]>(environment.baseURL + 'friend');
    }

    public fetchMyRequests() {
        return this.http.get<Friend[]>(environment.baseURL + 'friend/myRequests');
    }

    public fetchMyFriendsWishOnThisGift(giftId: number) {
        return this.http.get(this.apiUrl + `friend/wish/${giftId}`);
    }

    public update(id: number) {
        return this.http.put(this.apiUrl + `friend/${id}`, {});
    }

    public delete(id: number) {
        return this.http.delete(this.apiUrl + `friend/${id}`);
    }

    public create(friendId: number) {
        return this.http.post(this.apiUrl + 'friend', friendId);
    }
}
