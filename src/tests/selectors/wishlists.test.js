import { getWishlist } from '../../selectors/wishlists';
import myWishlists from '../dataForTest/wishlists';

test('Should select the right wishlist object based on id', () => {
  const result = getWishlist(myWishlists, 'fcvg67');
  expect(result).toEqual({
    id:'fcvg67',
    createdAt: '20131020',
    status: "Private",
    title:'holiday stuff',
    category: 'holiday',
    eventLinksIds: ["summer holidays 2020"],
    tags: ["summer","holiday"],
    items: []
  });
});
