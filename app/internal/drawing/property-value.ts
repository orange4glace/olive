// import { Postable, postable } from 'worker-postable';
// import PostableVector2 from 'util/postable_vector2';

// export interface PropertyValueBase<T> {
//   value: T;
// }

// export abstract class PropertyValue<T> implements PropertyValueBase<T> {

//   @postable value: T;

//   constructor(val: T) {
//     this.value = val;
//   }

//   abstract interpolate(rhs: PropertyValue<T>, time: number): PropertyValue<T>;
//   abstract clone(): PropertyValue<T>;

// }

// export interface ScalarPropertyValueBase extends PropertyValueBase<number> {

// }

// @Postable
// class ScalarPropertyValue extends PropertyValue<number> implements ScalarPropertyValueBase {

//   constructor(val: number) {
//     super(val);
//   }

//   interpolate(rhs: PropertyValue<number>, time: number): PropertyValue<number> {
//     return new ScalarPropertyValue(this.value + (rhs.value - this.value) * time);
//   }

//   clone(): PropertyValue<number> {
//     return new ScalarPropertyValue(this.value);
//   }

// }

// export interface Vector2PropertyValueBase extends PropertyValueBase<PostableVector2> {

// }

// @Postable
// class Vector2PropertyValue extends PropertyValue<PostableVector2> implements Vector2PropertyValueBase {

//   constructor(val: PostableVector2) {
//     super(val);
//   }

//   interpolate(rhs: PropertyValue<PostableVector2>, time: number): PropertyValue<PostableVector2> {
//     return new Vector2PropertyValue(PostableVector2.interpolate(this.value, rhs.value, time));
//   }

//   clone(): PropertyValue<PostableVector2> {
//     return new Vector2PropertyValue(new PostableVector2(this.value.x, this.value.y));
//   }

// }

// export {
//   ScalarPropertyValue,
//   Vector2PropertyValue
// }