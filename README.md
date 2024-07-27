# Dashboard

## 参考にしたドキュメント一覧

- [typedoc](https://typedoc.org/options/)
- [eslint](https://eslint.org/docs/latest/use/configure/)

## ngrxについて

### ngrx/signalsについて

- [ngrx-toolkit](https://www.npmjs.com/package/@angular-architects/ngrx-toolkit)

<br>
どうやらsignalStoreを2つ以上providerでinjectすると処理が走らないっぽい
<br>
[7a9aa34](https://github.com/mzkmnk/dashboard/pull/3/commits/7a9aa34431b2b290fa0e6525a6e73cf4f947c27a)
<br>
<details><summary>注意</summary>

```
{ providedIn: 'root' },
// withDevtools('[sidebar signal store]'),
withState(initialState),
```

こうしてるが

```
//{ providedIn: 'root' },
withDevtools('[sidebar signal store]'),
withState(initialState),
```

こうしても同じだった。

</details>
