import Card from '../components/Card';
import Image from 'next/image';

const MyPage = () => {
  return (
    <div>
      <Card
        imageSrc="/public/card.jpg"
        title="Title of the Card"
        description="Description of the Card"
      />
    </div>
  );
};

export default MyPage;
