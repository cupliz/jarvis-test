import React, { useEffect, useState } from 'react'
import { Modal } from 'semantic-ui-react'
import faker from 'faker'
import dayjs from 'dayjs'
const pictures = [
  "https://image.flaticon.com/icons/svg/206/206898.svg",
  "https://image.flaticon.com/icons/svg/206/206865.svg",
  "https://image.flaticon.com/icons/svg/206/206877.svg",
  "https://image.flaticon.com/icons/svg/206/206880.svg",
  "https://image.flaticon.com/icons/svg/306/306009.svg",
  "https://image.flaticon.com/icons/svg/305/305974.svg",
  "https://image.flaticon.com/icons/svg/305/305978.svg",
  "https://image.flaticon.com/icons/svg/305/305994.svg",
]

let users = new Array(8)
for (let i = 0; i < users.length; i++) {
  users[i] = {
    id: i + 1,
    name: faker.name.findName(),
    email: faker.internet.email(),
    photo: pictures[i],
    phone: faker.phone.phoneNumber(),
    company: faker.company.companyName(),
    birthday: dayjs(faker.date.past()).subtract(10, 'years').format('YYYY-MM-DD'),
    address: {
      street: faker.address.streetAddress(),
      city: faker.address.city(),
      county: faker.address.county(),
      country: faker.address.country(),
      zipCode: faker.address.zipCode(),
    },
    description: faker.lorem.words(15),
    friends: faker.random.number(99)
  }
}
export default () => {
  const [detail, setDetail] = useState({})
  useEffect(() => { }, [])
  return (
    <div className="ui container content">
      {detail.id &&
        <Modal
          open={detail.id ? true : false}
          onClose={() => setDetail({})}
          >
          <div className="header">
            <div className="ui small image"><img src={detail.photo} alt="" /></div>
            <h3 className="teal">{detail.name}</h3>
          </div>
          <div className="content">
            <div className="ui two column grid stackable">
              <div className="column">
                <p><span className="ui capitalize teal">Birthday</span>: {detail.birthday}</p>
                <p><span className="ui capitalize teal">Email</span>: {detail.email}</p>
                <p><span className="ui capitalize teal">Phone</span>: {detail.phone}</p>
                <p>{detail.description}</p>
              </div>
              <div className="column">
                {detail.address && Object.keys(detail.address).map((addr, i) =>
                  <p key={i}><span className="ui capitalize teal">{addr}</span>: {detail.address[addr]}</p>
                )}
              </div>
              <p>{detail.name} has <span className="ui capitalize teal">{detail.friends}</span> friends</p>
              <br />
            </div>
          </div>
        </Modal>
      }

      <div className="ui four column grid">
        {users && users.map((user, i) =>
          <div key={i} className="column">
            <div className="ui card user teal" onClick={() => setDetail(user)}>
              <div className="image"> <img src={user.photo} alt="" /> </div>
              <br />
              <span className="header center aligned">{user.name}</span>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}