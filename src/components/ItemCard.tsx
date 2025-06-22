import type { Item } from "../interfaces";
import { format } from 'date-fns';
import { Col, Container, Image, Row } from "react-bootstrap";

import './ItemCard.css'

import dairyIcon from "../assets/images/food_icons/dairy.png"
import produceIcon from "../assets/images/food_icons/produce.png"
import grainIcon from "../assets/images/food_icons/grain.png"
import proteinIcon from "../assets/images/food_icons/protein.png"
import frozenIcon from "../assets/images/food_icons/frozen.png"
import nonPerishableIcon from "../assets/images/food_icons/canned.png"

import goodIcon from "../assets/images/expiration_icons/good.png"
import cautionIcon from "../assets/images/expiration_icons/caution.png"
import expiredIcon from "../assets/images/expiration_icons/expired.png"
import defaultIcon from "../assets/images/food_icons/dish.png"


interface ItemCardProps {
  item: Item;
}

interface Dictionary<T> {
    [Key: string]: T;
}

const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
  const formattedDate = format(new Date(item.expirationDate!), "MMMM do yyyy");

  // Associated icons for item cateogry types
  const categoryIcons : Dictionary<string>= {
    "Dairy": dairyIcon,
    "Produce": produceIcon,
    "Grain": grainIcon,
    "Protein": proteinIcon,
    "Frozen": frozenIcon,
    "Non-Perishable": nonPerishableIcon,
  };

  // Get the expiration icon based on if the food has expired, is about to expire, or has not
  const getExpirationIcon = (): string => {
    if (!item.expirationDate) {
      return goodIcon
    }

    const currentDate = new Date();
    const expirationDate = new Date(item.expirationDate);
    if (expirationDate < currentDate) {
      return expiredIcon
    } else if (expirationDate.getTime() - currentDate.getTime() <= 7 * 24 * 60 * 60 * 1000) {
      return cautionIcon
    } else {
      return goodIcon
    }
  };

  // Get the item icon based on the category of the food
  const getItemIcon = () => {
    if (!item.category || item.category === "Other") {
      return defaultIcon; // Default icon
    } else {
      return categoryIcons[item.category];
    }
  }

  return (
      <div className='item_card_container'>
        <Row style={{height: 'auto'}}>
            {/* Expiration Icon */}
            <Col xs={2}>
                <Image
                src={getExpirationIcon()}
                width={"40px"} height={"40px"}
                />
            </Col>
        
            {/* Item Info */}
            <Col>
                <Container fluid className="item_card_text_container">
                    <p className='title'>{item.name}</p>
                    <p className='subtitle'>{formattedDate}</p>
                </Container>
            </Col>

            {/* Item Icon */}
            <Col className="d-flex flex-column align-items-end">
                <Image
                src={getItemIcon()}
                width={"40px"} height={"auto"}
                className="align-self-end"
                />
            </Col>
        </Row>
      </div>
  );
};

export default ItemCard;
