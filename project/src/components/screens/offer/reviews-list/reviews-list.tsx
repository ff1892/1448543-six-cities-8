import { CommentGet } from '../../../../types/comment';
import Review from '../review/review';

type ReviewsListProps = {
  reviews: CommentGet[];
};

function ReviewsList({reviews} : ReviewsListProps): JSX.Element {
  return (
    <>
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
      <ul className="reviews__list">
        {
          reviews.map((review) => <Review key={review.id} review={review} />)
        }
      </ul>
    </>
  );
}

export default ReviewsList;
