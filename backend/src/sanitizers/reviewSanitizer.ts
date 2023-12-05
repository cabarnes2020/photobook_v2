import { IReview } from "../models/Review.js";
import HttpException from "../utils/httpException.js";



export async function sanitizeReview(review: IReview): Promise<IReview> {
    if(!review) throw new HttpException(400, 'Review is not defined')

    let sanitizedReview = <IReview>{}

    sanitizedReview.content = sanitizeContent(review.content)
    sanitizedReview.reviewer = review.reviewer
    
    return sanitizedReview
}



function sanitizeContent(content: string): string {
    if(content === undefined) throw new HttpException(400, 'Content is undefined')

    if(typeof content !== 'string') throw new HttpException(400, 'Content is not a string')

    //Gets rid of unnecessary white space
    content = content.trim()

    if(content.length < 2) throw new HttpException(400, 'Content must be 3 characters or more')

    if(content.length > 250) throw new HttpException(400, 'Content must be shorter than 250 characters')

    return content
}
