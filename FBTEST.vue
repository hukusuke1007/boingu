<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <v-container
        fluid
        style="min-height: 0;"
        grid-list-lg
        >
    <v-flex>
      <v-card flat>
        <v-form v-model="valid" ref="form" lazy-validation>
          <v-text-field
            label="請求書名"
            v-model="name"
          ></v-text-field>
        </v-form>
      </v-card>
    </v-flex>
    <v-flex>
      <v-btn color="blue" class="white--text" @click="writeData" :disabled="!valid">書き込み</v-btn>
      <v-btn color="blue" class="white--text" @click="readData" :disabled="!valid">読み取り</v-btn>
      <v-btn color="blue" class="white--text" @click="detachListen" :disabled="!valid">デタッチ</v-btn>
      <v-btn color="blue" class="white--text" @click="transaction" :disabled="!valid">NEM</v-btn>
    </v-flex>
    </v-container>
  </div>
</template>

<script>
import firebase from 'firebase'
import 'firebase/firestore'
import nemWrapper from '@/js/nem_wrapper'

export default {
  name: 'hello',
  data: () => ({
    msg: 'Welcome to Your Vue.js PWA',
    name: '',
    valid: true,
    db: firebase.firestore()
  }),
  mounted () {
    this.init()
  },
  methods: {
    init () {
      console.log('aaaa')
      // this.listenData()
      // nemWrapper.testNemSDK()
    },
    listenData () {
      // 単一ドキュメンと変更のリッスン
      this.db.collection('cities').doc('SF')
       .onSnapshot((doc) => {
         let source = doc.metadata.hasPendingWrites ? 'Local' : 'Server'
         console.log(source, ' data:', doc && doc.data())
       })

      // 複数ドキュメント変更のリッスン
      this.db.collection('cities').where('state', '==', 'CA')
       .onSnapshot((snapshot) => {
         let cities = []
         snapshot.forEach((doc) => {
           cities.push(doc.data().name)
         })
         console.log("Current cities in CA: ", cities.join(", "))
       })
      
      // 複数ドキュメントの変更タイプ取得.
      this.db.collection('cities').where('state', '==', 'CA')
       .onSnapshot((snapshot) => {
         snapshot.docChanges().forEach((change) => {
           if (change.type === 'added') {
             console.log('New city:', change.doc.data())
           }
           if (change.type === 'modified') {
             console.log('Modified city:', change.doc.data())
           }
           if (change.type === 'removed') {
             console.log('Removed city:', change.doc.data())
           }
         })
       })
    },
    detachListen () {
      let detachRef = this.db.collection('cities').onSnapshot( () => {})
      detachRef()
    },
    transaction () {
      nemWrapper.getAccount('MAY5BD7NBTF7BPBOKREVTHVOQUWHHQULZJ5QHFGC')
      .then((result) => {
        console.log(result)
      }).catch((error) => {
        console.error(error)
      })
    },
    writeData () {
      // SubCollection.
      let ref = this.db.collection('cities').doc('LA').collection('sub')
      ref.doc('A').set({
        item: 1
      })
      /*
      let ref = this.db.collection('cities')
      ref.doc('SF').update({
        newItem: 1
      }).then(() => {
        console.log('OK')      
      }).catch((error) => {
        console.error(error)
      })

      ref.doc('HeyHey').update({
        name: 'shohei',
        state: 'CA',
        item: 'a'
      })
      */
      // this.prepare()
      /*
      // バッチ処理.
      this.batchData()
      */
      /*
      // トランザクション.
      this.transactionData()
      */
      /*
      // 値更新.
      db.collection('cities').doc('DC').set({
        name: 'shohei',
        like: 'TRF',
        born: 1815
      }).then(() => {
        let updateRef = db.collection('cities').doc('DC')
        updateRef.update({
          capital: true
        }).then(() => {
          console.log('OK')
        }).catch((error) => {
          console.error(error)
        })
      }).catch((error) => {
        console.error(error)
      })
      */
      /*
      // マージ
      let cityRef = db.collection('cities').doc('BJ')
      cityRef.set({
        name: 'shohei',
        like: 'TRF',
        born: 1815
      }).then(() => {
        console.log('OK')
        cityRef.set({
          marge: true
        }, { merge: true })        
      }).catch((error) => {
        console.error(error)
      })
      */
      /*
      // 上書き追加.
      db.collection('members').doc('LA').set({
        name: 'shohei',
        like: 'TRF',
        born: 1815
      }).then(() => {
        console.log('OK')
      }).catch((error) => {
        console.error(error)
      })
      */
      /*
      // 一意なIDをドキュメント名にして追加
      db.collection('users').add({
        first: 'Ada',
        last: 'Lovelance',
        born: 1815
      }).then((docRef) => {
        console.log(docRef)
      }).catch((error) => {
        console.error(error)
      })
      */
    },
    getData () {
      let ref = this.db.collection('cities').doc('LA')
      ref.get().then((snapshot) => {
        console.log(snapshot.data())
      })

      // サブコレクションの中身.
      let ref2 = this.db.collection('cities').doc('LA').collection('sub')
      ref2.get().then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          console.log('sub', doc.id, doc.data())
        })
      })

      let ref3 = this.db.collection('cities').doc('BJ')
      ref3.get().then((snapshot) => {
        console.log('BJ', snapshot.data())
      })
      /*
      // ページ設定 あらかじめ25個の要素を取得後に次の25個の要素を取得する.
      let first = this.db.collection('cities').orderBy('population').limit(25)
      first.get().then((snapshot) => {
        let lastVisible = snapshot.docs[snapshot.docs.length-1]
        console.log('last', lastVisible)

        // Construct a new query starting at this document,
        // get the next 25 cities.
        let next = this.db.collection('cities')
         .orderBy('population')
         .startAfter(lastVisible)
         .limit(25)
      })
      */
      /*
      // ドキュメントスナップショットを用いたクエリ
      // orderBy("population")を指定してやれば、startAt()の条件もpopulationに自動的に制限される
      let ref = this.db.collection('cities')
      ref.doc('SF').get().then((doc) => {
        console.log('doc', doc)
        let bgThanSf = ref.orderBy('population').startAt(doc)
        bgThanSf.get().then((snapshot) => {
          snapshot.forEach((doc) => {
            console.log(doc.id, ' => ', doc.data())
          })
        })
      })
      */
      // クエリカーソル populationが1000000以上の集合を昇順で取得.
      // let ref = this.db.collection('cities').orderBy('population').startAt(1000000)
      // クエリカーソル populationが1000000以上の集合を降順で取得.
      // let ref = this.db.collection('cities').orderBy('population').endAt(1000000)
      // 並べ替えと制限
      // let ref = this.db.collection('cities').orderBy('population', 'desc').limit(3)
      /*
      ref.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.id, ' => ', doc.data())
        })
      }).catch((error) => {
        console.error(error)
      })
      */
      /*
      // 複合クエリ whereを繋げることでAND条件検索.
       this.db.collection('cities').where('capital', '==', true).where('country', '==', 'USA')
       .get()
       .then((querySnapshot) => {
         querySnapshot.forEach((doc) => {
           console.log(doc.id, ' => ', doc.data())
         })
       })     
      */
      /*
      // 条件一致.
      this.db.collection('cities').where('capital', '==', true)
       .get()
       .then((querySnapshot) => {
         querySnapshot.forEach((doc) => {
           console.log(doc.id, ' => ', doc.data())
         })
       })
      */
      /*
      // 全データ取得.
      this.db.collection('cities').get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.id, '=>', doc.data())
        })
      })
      */
      /*
      // 単一データ取得.
      let ref = this.db.collection('cities').doc('SF')
      ref.get().then((doc) => {
        if (doc.exists) {
          console.log('Document data', doc.data())
        } else {
          console.log('No such document')
        }
      }).catch((error) => {
        console.error(error)
      })
      */
    },
    prepare () {
    let citiesRef = this.db.collection("cities")
    citiesRef.doc("SF").set({
        name: "San Francisco", state: "CA", country: "USA",
        capital: false, population: 860000 })
    citiesRef.doc("LA").set({
        name: "Los Angeles", state: "CA", country: "USA",
        capital: false, population: 3900000 })
    citiesRef.doc("DC").set({
        name: "Washington, D.C.", state: null, country: "USA",
        capital: true, population: 680000 })
    citiesRef.doc("TOK").set({
        name: "Tokyo", state: null, country: "Japan",
        capital: true, population: 9000000 })
    citiesRef.doc("BJ").set({
        name: "Beijing", state: null, country: "China",
        capital: true, population: 21500000 })
    },
    batchData () {
      let db = firebase.firestore()
      let batch = db.batch()
      let ref = db.collection('cities')
      batch.set(ref.doc('NYC'), {name: 'New York City'})
      batch.set(ref.doc('SF'), {population: 200})
      batch.delete(ref.doc('LA'))
      batch.commit().then(() => {
        console.log('OK')
      }).catch((error) => {
        console.error(error)
      })
    },
    transactionData () {
      let db = firebase.firestore()
      let ref = db.collection('cities').doc('SF')

      db.runTransaction((transaction) => {
        // トランザクション内部で外部の操作はだめ。失敗のたびに何回も呼ばれるため
        return transaction.get(ref)
         .then((doc) => {
           let value = doc.data().population + 1
           if (value <= 1000) {
             transaction.update(ref, { population: value})
           } else {
             return Promise.reject('Population is Big')
           }
         })
      }).then(() => {
        console.log('OK')
      }).catch((error) => {
        // 'Population is Big'
        console.error(error)
      })
    },
    readData () {
      /*
      let db = firebase.firestore()
      db.collection('users').get().then((querySnapshot) => {
        console.log('querySnapshot', querySnapshot)
        querySnapshot.forEach((doc) => {
          console.log(doc.id, doc.data())
        })
      })
      */
      this.getData()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #35495E;
}
</style>
